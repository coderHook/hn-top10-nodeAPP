import express, {Application} from 'express'
import bodyParser from 'body-parser'
import top10Routes from './routes/top10.routes'

const app: Application = express();

const port: number = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//Top 10 words routes
app.use('/top10', top10Routes)

app.listen(port, () => 
  console.log(`App Running on http://localhost:${port}/top10`)
);