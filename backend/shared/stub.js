/** Renders the "not built yet" page for a route whose handler is still TODO. */
import { renderPage } from '../../render.js';

export function todo({ owner, feature, routines, template }) {
  return (req, res) => renderPage(req, res, 'todo.html', {
    owner,
    feature,
    routines,
    template,
    method: req.method,
    path: req.path,
    endpoint: req.endpoint,
  }, 501);
}
