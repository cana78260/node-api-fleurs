import Plante from "../models/interface/PlanteInterface";
import { AppDataSource } from "../data-source";
import PlanteController from "../CONTROLLER/ControllerPlante";

class PlanteService {
  getAllPlantes(): Promise<void> {
    return AppDataSource.query(`SELECT * FROM plante`);
  }

  getOnePlant(id: number): Promise<void> {
    return AppDataSource.query(`Select * FROM plante where id = ${id}`);
  }

  postOnePlant(plante: Plante): Promise<void> {
    return AppDataSource.query(`INSERT INTO plante (name, unitprice_ati, quantity, category, rating, url_picture ) 
                            VALUES ('${plante.name}', ${plante.unitprice_ati}, ${plante.quantity}, '${plante.category}', ${plante.rating}, '${plante.url_picture}')`);
  }

  putOneplant(id: number, changes: Plante): Promise<void> {
    return AppDataSource.query(
      `UPDATE plante SET name='${changes.name}', unitprice_ati=${changes.unitprice_ati}, quantity=${changes.quantity}, category='${changes.category}', rating=${changes.rating}, url_picture='${changes.url_picture}' WHERE id= ${id}`
    );
  }

  deleteOnePlant(id: number): Promise<void> {
    return AppDataSource.query(`DELETE FROM plante where id = ${id}`);
  }
}

export default PlanteService;
