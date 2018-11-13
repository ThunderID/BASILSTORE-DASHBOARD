export default function (ctx) {
  if (!ctx.store.state.authentication.me) {
    return ctx.redirect('/')
  }
  console.log('Middleware Auth Running')
}
