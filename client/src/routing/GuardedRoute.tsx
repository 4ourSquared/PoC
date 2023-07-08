import { Navigate, Outlet } from 'react-router-dom';
import VerifyLogin from './VerifyLogin'

interface GuardedRouteProps {
	/**
	 * Permission check for route
	 * @default false
	 */
     condition?: boolean;
	/**
	 * Route to be redirected to
	 * @default '/'
	 */
	redirectRoute?: string;
}

/**
 * Component for guarding restricted routes
 *
 * @example Default usage
 * ```ts
 * <GuardedRoute
 *	 condition={true}
 * />
 * ```
 *
 * @example Usage with custom redirected route
 * ```ts
 * <GuardedRoute
 *	 condition={false}
 *	 redirectRoute={'/login'}
 * />
 * ```
 */
const GuardedRoute = ({
	condition = VerifyLogin(),
	redirectRoute = 'login',
}: GuardedRouteProps): JSX.Element =>
	condition ? <Outlet /> : <Navigate to={redirectRoute} replace />;

export default GuardedRoute;