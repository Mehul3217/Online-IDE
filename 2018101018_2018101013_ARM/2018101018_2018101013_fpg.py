import csv
import itertools
import time
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import fpgrowth
import matplotlib.pyplot as plt
from collections import OrderedDict
data = pd.read_csv('MSNBC.txt',header=None)

trans = []
trans_c=[]


for i in range(0,len(data)):
    li = []
    li = data.values[i][0].split(' -1 ')
    li.sort()
    ma = {}
    for j in range(0,len(li)):
        ma[li[j]] = 1
    dict = OrderedDict(sorted(ma.items()))
    del dict['-2']
    
    ls = []
    for key in dict.keys():
    	ls.append(key)
    trans.append(ls)





for i in trans:
    cpy=[]
    for j in i:
        cpy.append(j)
    trans_c.append(cpy)


for i in trans:
    i.insert(0, 1) 


class node: 
    def __init__(self,name):
        self.name = name
        self.count = 0
        self.children={}
       
    
    def add_node(self,path,ind):
            
        self.count+=path[0] 
        
        if ind==len(path):
            return 0
        
        if path[ind] not in self.children:
            self.children[path[ind]]=node(path[ind])
            self.children[path[ind]].parent=self
                
       
        c=self.children[path[ind]].add_node(path,ind+1)
        
        if len(self.children)>1 or c==1:
            return 1
        else :
            return 0
            
def dfs(node,path,b,base):

    if b >0 :
        if node.name not in base:
            base[node.name]=[]
        
        r=[]
        for i in path:
            r.append(i)
        r[0]=node.count
        base[node.name].append(r)
    
    path.append(node.name)
    for i in node.children:
        dfs(node.children[i],path,b+1,base)
    
    path.pop()
        
def fp(trans):
    
    lit={}
    for j in trans:
        c=j[0]
        for i in range (1,len(j)):
            if  j[i] not in lit:
                lit[j[i]]=c
            else:
                lit[j[i]]+=c
    
    for i in sorted (lit) : 
        if lit[i]<mn:
            del lit[i]
    

    
    b=sorted(lit.items(), key = lambda kv:(kv[1], -1*kv[0]), reverse = True)
 
    mod_trans=[]
    for i in trans:
        l=[]
        l.append(i[0])
        for j in b:
             if j[0] in i:
                    l.append(j[0])
        mod_trans.append(l)


   
    
    root=node('root')
    y=0
    for i in mod_trans:
        y+=root.add_node(i,1)
   
    if y==0:
        ans=[] 
        ret=[]
        mx=0
        for i in b:
            ret.append(i[0])
    
        for i in range(1,len(b)+1):
            for j in list(itertools.combinations(ret, i)):
                d=root.count
                for k in j:
                    d=min(d,lit[k])
                t1=list(j)    
                t1.reverse()
                t1.append(d)
                ans.append(t1)
        

        return ans
            
        
    else :
        path=[]
        base={}
        ans=[]
        dfs(root,path,0,base)
  
        for i in base:
            p=fp(base[i])
            ans.append([i,lit[i]])
               
            for j in p:
                l=[]
                l.append(i)
                for k in j:
                    l.append(k)
                ans.append(l)
        return ans
                    
def standard_fp(trans_c):
    te = TransactionEncoder()
    te_ary = te.fit(trans_c).transform(trans_c)
    df = pd.DataFrame(te_ary, columns=te.columns_)
    a=mn/len(trans_c)
    frequent = fpgrowth(df, min_support=a, use_colnames=True)
    return frequent




mn=600
r=[]
start_time = time.time()
r=fp(trans)
print('Time to find frequent itemset using modified algorithm')
print("--- %s seconds ---" % (time.time() - start_time))

for i in r:
    i=i.reverse()
r1=[]

for i in r:
    c=i[0]
    i.pop(0)
    r1.append([i,c])
r1.sort()    

for i in r1:
    print(i[0],i[1])

start_time = time.time()
strd=standard_fp(trans_c)
print('Time to find frequent itemset using standard algorithm')
print("--- %s seconds ---" % (time.time() - start_time))
for i in range(0,len(strd)):
    print(strd.loc[i][1],round(strd.iloc[i][0]*len(trans_c)))



	


