import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { bootstrap as aureliaBootstrap } from "aurelia-bootstrapper";
import { Container } from "aurelia-dependency-injection";

PLATFORM.moduleName("main");

export async function configure(aurelia: Aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();

  await aurelia.start();
  aurelia.setRoot(PLATFORM.moduleName("app"), document.body);
}

type SingleSpaProps = {
  name: string;
  payload: unknown;
};

export async function bootstrap(props: SingleSpaProps) {
  await aureliaBootstrap(configure);
}

export async function mount(props: SingleSpaProps) {
  const aurelia = Container.instance.get(Aurelia);
  await aurelia.start();
  const id = `single-spa-application:${props.name}`;
  const domElement = document.getElementById(id);
  await aurelia.setRoot(PLATFORM.moduleName("app"), domElement);
}

export async function unmount() {
  const aurelia = Container.instance.get(Aurelia);
  const root = aurelia["root"];
  root.view.removeNodes();
  root.detached();
  root.unbind();
  aurelia.host = null;
  aurelia["hostConfigured"] = false;
}
