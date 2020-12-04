import pandas as pd
import itertools
import time as time
from collections import OrderedDict


data = pd.read_csv('sign.txt',header=None)
D = []
records = []

for i in range(0,len(data)):
    li = []
    li = data.values[i][0].split(' -1 ')
    li.sort()
    ma = {}
    for j in range(0,len(li)):
        ma[li[j]] = 1
    dict = OrderedDict(sorted(ma.items()))
    del dict['-2']
    D.append(dict)
    lis = []
    for key in dict.keys():
    	lis.append(key)
    records.append(lis)


D.sort(key=len)
mod  = 11

def add_to_ans(L):
    lis = []
    for key in L.keys():
        lis.append(key)
    return lis

def prune(itemset,l,n):
    for j in range(0,len(itemset)):
        i = ()
        for k in range(0,len(itemset)):
            if k!=j:
                i= i + (itemset[k],)
        if not i in l.keys():
            return False
    return True


def apriori_gen(Lk_1,k):
    C = list(Lk_1.keys())
    Ck = []
    for i in range(len(C)):
        for j in range(i+1,len(C)):
            s1 = C[i]
            s2 = C[j]
            flag = True
            for p in range(0,k-2):
                if s1[p] != s2[p]:
                    flag = False
                    break
                    
            if flag:
                s1 = s1 + (s2[k-2],)
                Ck.append(s1)
    
    L = []
    for i in range(len(Ck)):
        if prune(Ck[i],Lk_1,k-1):
            L.append(Ck[i])
    
    return L
def stage_1(items, msp):
    c1 = {}
    for i in range(0,len(records)):
    	for j in range(0,len(records[i])):
    		if records[i][j] in c1.keys():
    			c1[records[i][j]] += 1
    		else:
    			c1[records[i][j]] = 1
    
    C = OrderedDict(sorted(c1.items()))
    l1 = {}
    for key in C.keys():
        if C[key] >= msp:
           l1[key] = C[key] 
    
    return l1
def stage_2(l1, records, msp):
    l1 = list(l1.keys())
    L1 = list(itertools.combinations(l1, 2))
    C2 = {}
    L2 = {}
    for iter1 in L1:
        count = 0
        for iter2 in records:
            if(all(x in iter2 for x in iter1)):
                count+=1
        C2[iter1] = count

    C = OrderedDict(sorted(C2.items()))
    for key in C.keys():
        if C[key] >= msp:
            L2[key] = C[key]
    
    return L2
def stage_x(l2, records, msp,k):
    L2 = apriori_gen(l2, k)
    ck = {}
    lk = {}
    for iter1 in L2:
        count = 0
        for iter2 in records:
            if(all(x in iter2 for x in iter1)):
                count+=1
        ck[iter1] = count

    C = OrderedDict(sorted(ck.items()))
    for key in C.keys():
        if C[key] >= msp:
        	lk[key] = C[key] 
        
    return lk

def apriori(msp):
	ans=[]
	L1 = stage_1(records, msp)
	ans.append(add_to_ans(L1))
	lk = stage_2(L1, records, msp)
	k = 3
	while len(lk) > 0:
		ans.append(add_to_ans(lk))
		lk = stage_x(lk,records,msp,k)
		k+=1
	return ans


def frequent_1(D,msp):
    C = {}
    for i in range(0,len(D)):
        for key in D[i].keys():
            if key in C.keys():
                C[key] += 1
            else:
                C[key] = 1
    
    C1 = OrderedDict(sorted(C.items()))
    
    L1 = {}
    for key in C1.keys():
        if C1[key] >= msp:
            L1[key] = C1[key]
    
    return L1


def present(trans,lis):
    for i in range(0,len(lis)):
        if not lis[i] in trans.keys():
            return False
    return True


def frequent_2(Lk_1,D,msp,idx):
    L = list(itertools.combinations(Lk_1,2))
    CK = {}
    for iter1 in L:
        count = 0
        for i in range(idx,len(D)):
            flag = 0
            if present(D[i],iter1):
                flag = 1
            if flag:
                if iter1 in CK.keys():
                    CK[iter1] += 1
                else:
                    CK[iter1] = 1
    
    C = OrderedDict(sorted(CK.items()))
    LK = {}
    for key in C.keys():
        if C[key] >= msp:
            LK[key] = C[key]
    return LK

def frequent_k_itemset(Lk_1, D, msp,k,idx):
    L = apriori_gen(Lk_1,k)
    CK = {}
    for iter1 in L:
        count = 0
        for i in range(idx,len(D)):
            flag = 0
            if present(D[i],iter1): 
                flag = 1
            if flag:
                if iter1 in CK.keys():
                    CK[iter1] += 1
                else:
                    CK[iter1] = 1
    
    C = OrderedDict(sorted(CK.items()))
    LK = {}
    for key in C.keys():
        if C[key] >= msp:
            LK[key] = C[key]
    return LK


def update_transaction_database(D,k,idx):
    i = idx
    while i < len(D):
        if len(D[i]) >= k:
            break
        i+=1
    idx = i
    return idx


def add_to_ans(L):
    lis = []
    for key in L.keys():
        lis.append(key)
    return lis

def Transaction_Reduction(msp):
    ans = []
    idx = 0
    stage = 1
    L1 = frequent_1(D,msp)
    ans.append(add_to_ans(L1))

    stage += 1
    idx = update_transaction_database(D,stage,idx)
    Lk = frequent_2(L1,D,msp,idx)
    
    while len(Lk) > 0:
        ans.append(add_to_ans(Lk))
        stage += 1
        idx = update_transaction_database(D,stage,idx)
        Lk = frequent_k_itemset(Lk,D,msp,stage,idx)
        
    return ans


def hash_function(subset):
    s1 = subset[0]
    s2 = subset[1]
    sum1=0
    sum2=0
    for i in range(0,len(s1)):
        sum1+=ord(s1[i])
        sum1%=mod
    for i in range(0,len(s2)):
        sum2+=ord(s2[i])
        sum2%=mod
    idx = (sum1 + sum2)%mod
    return idx


def freq_1(D,msp):
    C = {}
    for i in range(0,len(D)):
        for key in D[i].keys():
            if key in C.keys():
                C[key] += 1
            else:
                C[key] = 1
    
    C1 = OrderedDict(sorted(C.items()))
    
    L1 = {}
    for key in C1.keys():
        if C1[key] >= msp:
            L1[key] = C1[key]

    hash_count = []
    for i in range(0,mod):
        hash_count.append(0)
        
    hash_table = {}
    for key in range(0,mod):
        hash_table[key] = {}
    
    di = {}
    for i in range(0,len(D)):
        lis = []
        if len(D[i]) <= 1:
        	continue
        for key in D[i].keys():
            if key in L1.keys():
                lis.append(key)
        if len(lis) <= 1:
        	continue
        subset = list(itertools.combinations(lis,2))
        for h in range(0,len(subset)):
            idx=0
            if subset[h] in di:
                idx = di[subset[h]]
            else:
                idx = hash_function(subset[h])
                di[subset[h]] = idx
            hash_count[idx] += 1
            if subset[h] in hash_table[idx].keys():
            	hash_table[idx][subset[h]] += 1
            else:
            	hash_table[idx][subset[h]] = 1
    
            
    return L1,hash_table,hash_count
        

def freq_2(hash_table,hash_count,msp):
    L2 = {}
    for i in range(0,mod):
        if  hash_count[i] >= msp:
            for key in hash_table[i].keys():
                if hash_table[i][key] >= msp:
                    L2[key] = hash_table[i][key]

    return L2

    
def Hash_Transaction_Reduction(msp):
    ans=[]
    idx2 = 0
    stage = 1
    L1,hash_table,hash_count = freq_1(D,msp)
    ans.append(add_to_ans(L1))

    stage += 1
    idx2 = update_transaction_database(D,stage,idx2)
    L2 = freq_2(hash_table,hash_count,msp)
    Lk = OrderedDict(sorted(L2.items()))
    
    while len(Lk) > 0:
        ans.append(add_to_ans(Lk))
        stage += 1
        idx2 = update_transaction_database(D,stage,idx2)
        Lk = frequent_k_itemset(Lk,D,msp,stage,idx2)
        
    return ans


def Hash_Based_Technique(msp):
    ans=[]
    idx2 = 0
    stage = 1
    L1,hash_table,hash_count = freq_1(D,msp)
    ans.append(add_to_ans(L1))

    stage += 1
    L2 = freq_2(hash_table,hash_count,msp)
    Lk = OrderedDict(sorted(L2.items()))
    
    while len(Lk) > 0:
        ans.append(add_to_ans(Lk))
        stage += 1
        Lk = frequent_k_itemset(Lk,D,msp,stage,idx2)
        
    return ans




minimum_support = 300
start_time = time.time()
ans = Transaction_Reduction(minimum_support)
end = (time.time()-start_time)
print("Transaction_Reduction")
print("-- Time %s" % (time.time()-start_time))
print("")
print(ans)
print("")


start_time = time.time()
ans = Hash_Based_Technique(minimum_support)
end = (time.time()-start_time)
print("Hash_Based_Technique")
print("-- Time %s" % (time.time()-start_time))
print("")
print(ans)
print("")

start_time = time.time()
ans = Hash_Transaction_Reduction(minimum_support)
end = (time.time()-start_time)
print("Hash_Transaction_Reduction")
print("-- Time %s" % (time.time()-start_time))
print("")
print(ans)
print("")

start_time = time.time()
ans = apriori(minimum_support)
end = (time.time()-start_time)
print("Standard")
print("-- Time %s" % (time.time()-start_time))
print("")
print(ans)
print("")