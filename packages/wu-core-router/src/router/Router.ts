import { HistoryRouter } from './HistoryRouter';
import { HashRouter } from './HashRouter';
import { BaseRouter, RouterOptions } from './common';
import RouterConfig from '../router/RouterConfig';

export class Router implements BaseRouter {
    private routerInstance: HistoryRouter | HashRouter;
    constructor(options: RouterOptions) {
        if (options.routers) {
            options.routers.forEach(item => {
                RouterConfig.register({
                    path: item.path,
                    element: item.element,
                });
            });
        }
        switch (options.type) {
            case 'hash':
                this.routerInstance = new HashRouter(options);
                break;
            case 'history':
                this.routerInstance = new HistoryRouter(options);
                break;
            default:
                this.routerInstance = new HashRouter(options);
        }
    }

    public push(path: string, data?: Record<any, any>, ...args) {
        return this.routerInstance.push.call(this, path, data, ...args);
    }

    public back(...args) {
        return this.routerInstance.back.call(this, ...args);
    }
}
