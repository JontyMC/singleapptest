import { RouterConfiguration, Router } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = "Osso";
    config.options.pushState = true;
    config.options.root = "/";
    config.map([
      {
        route: ["", "home"],
        name: "home",
        title: "Home",
        moduleId: PLATFORM.moduleName("home"),
        nav: true,
      },
      {
        route: "about",
        name: "about",
        title: "About",
        moduleId: PLATFORM.moduleName("about"),
        nav: true,
      },
    ]);
  }
}
