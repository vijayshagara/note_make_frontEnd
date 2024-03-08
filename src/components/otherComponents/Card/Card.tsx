// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Card/card.css'
import { Link } from 'react-router-dom';
import img from '../../../Assest/Images/Group 356.svg'
import { useNavigate } from 'react-router-dom';

// interface Note {
//   _id: string; // Adjust this based on the actual property name from your API
//   title: string;
//   notes: string;
//   isActive: boolean;
//   color:string
// }

export default function BasicCard(props: { data: any }) {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (e:any)=>{
  e.preventDefault()
  navigate('/add-notes')
  }


  return (
    <>
    <div className='card'>
      {data && data.length > 0 ? (
        <>
          {/* <h1 className='text-white text-center mt-1'>Your Notes</h1> */}
          {data.map((d: any) => (
            <Link className='cardLink' key={d._id} to={`/add-notes/${d._id}`}>
              <Card key={d._id} className="single_card" style={{ backgroundColor: d.color }}>
                <CardContent>
                  <Typography className='title' variant="h5" component="div">
                    {d.title}
                  </Typography>
                  <p>{d.notes}</p>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Edit</Button> */}
                </CardActions>
              </Card>
            </Link>
          ))}
        </>
      ) : (
        <div className='image-placeholder' onClick={handleClick}>
          <img src={img} alt="Image Placeholder" />
          <h3 className='img_text'>You haven’t created notes yet. I am here to help you.</h3>
          <div><i className="bi bi-plus-circle" style={{ fontSize: "40px", color: "white" }}></i></div>
        </div>
      )}
    </div>
  </>
  

  );
}