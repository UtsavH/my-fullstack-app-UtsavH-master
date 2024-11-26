const checkMarcoPolo= (req, res, next)=>{
    //intercept the request 

    console.log('Passing through the middle ware')

    //check the request headers for a header call x-marcopolo
    const marco= req.header('x-marco')
    console.log(marco)

    //no header or the value isn't polo? redirect with a 401
    if(!req.header('x-marco') || req.header()){
        res.status(401).send()//401 unauthorized
    }

    //if header => check that value eis "Polo"
    if(!marco || marco !== 'polo'){
        res.status(401).send()  //401= unauthorized- dont allow request to proceed
        return
    }
    
    next()//allow the request to proceed 
}

export default checkMarcoPolo
