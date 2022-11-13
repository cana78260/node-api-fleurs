import { Request, Response } from "express";
import Plante from "../models/interface/PlanteInterface";
import PlanteService from "../Services/PlanteService";

class PlanteController {
  public planteService = new PlanteService();

  async getAllPlantes(req: Request, res: Response) {
    try {
      const allPlantes = await this.planteService.getAllPlantes();

      res.send({ status: "ok, charly", data: allPlantes });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async getOnePlant(req: Request, res: Response) {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const getPlantById = await this.planteService.getOnePlant(id);
      console.log(getPlantById);
      res.send({ status: "ok", data: getPlantById });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", message: error?.message });
    }
  }

  async postOnePlant(req: Request, res: Response) {
    const newPlante = { ...req.body };
    if (
      !newPlante.name ||
      newPlante.unitprice_ati === undefined ||
      newPlante.quantity === undefined ||
      newPlante.category === undefined ||
      newPlante.rating === undefined ||
      newPlante.url_picture === undefined
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity','category','rating','url_picture'",
        },
      });
      return;
    }
    try {
      await this.planteService.postOnePlant(newPlante);
      res.send({ status: "ok", message: "plante created" });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async putOnePlant(req: Request, res: Response): Promise<void> {
    const changes: Plante = { ...req.body };
    const putId = req.params.id;
    if (!putId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (
      !changes.name ||
      !changes.unitprice_ati ||
      !changes.quantity ||
      !changes.category ||
      !changes.rating ||
      !changes.url_picture
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity', 'category', 'rating', 'url_picture',",
        },
      });
      return;
    }
    try {
      const id = parseInt(putId);
      const updatePlant = await this.planteService.putOneplant(id, changes);
      res.send({
        status: "ok",
        message: `Plante with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", message: error?.message });
    }
  }

  async deleteOnePlant(req: Request, res: Response) {
    const delId = req.params.id;
    if (!delId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const deleteId = parseInt(delId);
      const delPlante = await this.planteService.deleteOnePlant(deleteId);
      res.send({ status: "ok", message: `plante n° ${deleteId} cancelled` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

export default PlanteController;
