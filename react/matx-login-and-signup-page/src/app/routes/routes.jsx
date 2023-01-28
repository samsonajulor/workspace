import NotFound from 'app/views/sessions/NotFound'
import sessionRoutes from 'app/views/sessions/SessionRoutes'

export const AllPages = () => {
    const all_routes = [
        ...sessionRoutes,
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
