import { httpClient } from '../../utils/http.util.js';
import { AuthInterceptor } from '../interceptors/auth.interceptor.js';

export class HttpManager {
  private static initialized = false;

  public static setup(): void {
    if (HttpManager.initialized) return;
    HttpManager.initialized = true;

    const authInterceptor = new AuthInterceptor(httpClient);
    authInterceptor.setup();
  }
}
