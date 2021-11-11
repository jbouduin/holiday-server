import * as express from 'express'
import { Express } from 'express'
import { Server } from 'http'

import { HolidayService } from './holiday-service';
/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {

  // <editor-fold desc='Private properties'>
  private server?: Express;
  private httpServer?: Server;
  private holidayService: HolidayService;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor() {
    this.holidayService = new HolidayService();
  }
  // </editor-fold>

  // <editor-fold desc='Public methods'>
  public setup(port: number): Express | undefined {
    const server = express();
    this.configureApiEndpoints(server);
    this.httpServer = this.listen(server, port)
    this.server = server
    return this.server
  }

  public listen(server: Express, port: number): Server {
    return server.listen(port)
  }

  public kill(): void {
    if (this.httpServer) this.httpServer.close()
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private configureApiEndpoints(server: Express) {
    server.get('/api/languages', this.holidayService.getLanguages);
    server.get('/api/hierarchy/:language?', this.holidayService.getHierarchyTree);
    server.get('/api/holidays/:language/:year/:hierarchy', this.holidayService.getHolidays);
  }
  // </editor-fold>
}
