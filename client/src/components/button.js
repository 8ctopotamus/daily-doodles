const Button = ({ className, href = '#', ...props }) => (
  <a href={href} className={`btn ${className}`} {...props}>{children}</a>
)

export default Button