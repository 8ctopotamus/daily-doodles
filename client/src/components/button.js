const Button = ({ className, href = '#', children, ...props }) => (
  <a href={href} className={`btn ${className}`} {...props}>{children}</a>
)

export default Button