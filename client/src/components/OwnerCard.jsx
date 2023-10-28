import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Avatar,
  } from "@material-tailwind/react";
   import {FaWhatsapp} from 'react-icons/fa'
import { Link } from "react-router-dom";
  export default function OwnerCard(props) {
    const id = props?.id || 1;
    return (
      <Card className="w-full md:min-w-[25rem] max-h-[300px] max-w-[40rem] shadow-lg mt-10">
      <Link to={`/seller/${id}`}>
        <CardHeader title="Click: for seller details" color="blue-gray" className='flex items-start cursor-pointer'>
        <Avatar
          size="xl"
          variant="circular"
          alt="tania andrew"
          className="border-2 border-white"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
          {/* <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " /> */}
          <Typography variant="h2" className="mt-2 ml-8 text-gray-900">
          Shivay
        </Typography>
        </CardHeader>
        </Link>
        <CardBody>
         
          <Typography color="gray">
            Enter a freshly updated and thoughtfully furnished peaceful home
            surrounded by ancient trees, stone walls, and open meadows.
          </Typography>
          
        </CardBody>
        <CardFooter className="flex justify-between pt-3">
        
        <Button   className='bg-gray-900 text-white xs:text-xs p-2 '>
            Chat with Owner
          </Button>
          <Button   className='bg-green-500 text-white'>
          <Link to={`https://wa.me/9930813692/?text=Hello%20there!%20I%20am%20interested%20in%20your%20this%20product%20:%20http://localhost:3000/productDetails/${id}`} target="_blank" rel="noopener noreferrer" >
         
           <FaWhatsapp size={20} />
          </Link>
          </Button>
     
          
        </CardFooter>
      </Card>
    );
  }