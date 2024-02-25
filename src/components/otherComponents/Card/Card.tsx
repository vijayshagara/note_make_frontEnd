// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Card/card.css'
import { Link } from 'react-router-dom';

interface Note {
  _id: string; // Adjust this based on the actual property name from your API
  title: string;
  notes: string;
  isActive: boolean;
  color:string
}

export default function BasicCard(props: { data: Note[] }) {
  const { data } = props

  return (
    <>
    <h1 className='text-white text-center mt-1'>Your Notes</h1>
    <div className='card'>
      {data.map((d) => {
        return (
          <Link className='cardLink' key={d._id} to={`/add-notes/${d._id}`}>
            <Card key={d._id} className="single_card" style={{backgroundColor:d.color}}>
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
        );
      })}
    </div>
  </>
  
  );
}