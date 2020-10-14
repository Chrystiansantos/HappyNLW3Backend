import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanages from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanages);
    const orphanages = await orphanageRepository.find();
    return res.status(200).json(orphanages);
  },
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanages);
    const orphanage = await orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });
    await orphanagesRepository.save(orphanage);
    res.status(201).json(orphanage);
  },
};
