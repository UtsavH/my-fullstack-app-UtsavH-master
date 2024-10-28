import  bcrypt from 'bcrypt';



const hash = await bcrypt.hash('utsav',10)
console.log(hash)