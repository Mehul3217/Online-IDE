const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path')

// app.use(express.static(path.join(__dirname, 'ide/public')))

app.get('/' ,function(req,res){
	res.sendFile(path.resolve(__dirname,'ide/public/index.html'))//,'src','App.js'))
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('ide/build'));
// }
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/ide/public/index.html'));
//   })
//}

app.listen(port, function() {
    console.log("Server is running on port: " + port);
});