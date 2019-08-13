import express, {Application} from 'express'
import bodyParser from 'body-parser'

const app: Application = express();
const port: number = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => 
  console.log(`App Running on http://localhost:${port}`)
);