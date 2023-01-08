import express from 'express';
import { Request, Response, Application } from 'express';
import Ipuppies from 'interface';
const bodyParser = require('body-parser');


const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

const puppies:Ipuppies[] = [
  {
    id: 1,
    breed: 'Golden',
    DOB: '23 April 2022',
    name: 'Fufu'
  },
  {
    id: 2,
    breed: 'Roborovskii’s',
   DOB: '6 January 2021',
    name: 'Gengen'
  },
  {
    id: 3, breed: 'Winter White', DOB: '22 October 2021', name: 'Bisbis'
  },]

  ////////Get
app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});
app.get (`/api/puppies`,(_req: Request, res: Response) => {
  
  return res.status(200).send( puppies);
});

app.get('/api/puppies/:id', (_req: Request, res: Response) => {
  const num = Number(_req.params.id)
  const puppy= puppies.find(p => p.id === num);
  if (!puppy) res.status(404).send('The Puppy with given ID is not available....');
  res.status(200).send(puppy);
});
//////Post
app.post('/api/puppies', (_req: Request, res: Response) => {
  const errors = [];
  if ( typeof (_req.body.breed) !== 'string' || typeof (_req.body.name) !== 'string') {
    errors.push('missing or faulty data...');
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(',') });
    return;
  }
  const puppy = {
    id:  _req.body.id,
    breed: _req.body.breed,
    DOB: _req.body.DOB,
    name: _req.body.name
  };
  puppies.push(puppy);
  res.status(201).send(puppy);
});

////Put
app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  const num = Number(_req.params.id);
  const puppy = puppies.find(p => p.id === num);
  if (!puppy) {
    return res.status(404).send('The Puppy with given ID is not available....');
  }
  puppy.breed = _req.body.from;
  puppy.DOB = _req.body.to;
  puppy.name = _req.body.name;
  const errors = [];
  if ((!puppy.name) || (!puppy.breed)) {
    errors.push('Not Found Data ...');
  }
  if (errors.length) {
    return res.status(406).json({ error: errors.join(',') });
  }
  return res.status(201).send(puppy);
});

///// Delet
app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  const num = Number(_req.params.id);
    
  const puppy = puppies.find(p =>p.id === num);

  if (!puppy) { return res.status(404).send('The Puppy with given ID is not available....'); }
  const index = puppies.indexOf(puppy);
  puppies.splice(index, 1);
  return res.status(205).send(puppy);
});

export default app;

