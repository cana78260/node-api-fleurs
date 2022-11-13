import { Router } from "express";
import PlanteController from '../CONTROLLER/ControllerPlante';


const planteRoute = Router();
const planteController = new PlanteController();

planteRoute.get('/', (req, res) => {
  planteController.getAllPlantes(req, res);
});

planteRoute.get('/:id', (req, res) => {planteController.getOnePlant(req, res);
});

planteRoute.post('/', (req, res) => {planteController.postOnePlant(req, res);
});

planteRoute.put('/:id', (req, res) => {planteController.putOnePlant(req, res);
});

planteRoute.delete('/:id', (req, res) => {planteController.deleteOnePlant(req, res);
})

export default planteRoute;