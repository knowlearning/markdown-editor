const katexMarkdownText = `
# Markdown with KaTeX

Here is an example of mathematical expressions using KaTeX.

## Inline Math
Inline math example: \$E = mc^2\$

## Display Math
The quadratic formula is given by:
\$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\$

## Integrals and Summations
The integral of a function \$f(x)\$ from \$a\$ to \$b\$ is:
\$ \\int_{a}^{b} f(x) \\, dx \$

The double integral over a region \$R\$ is:
\$ \\iint_{R} f(x, y) \\, dA \$

The summation of a series is:
\$ \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \$

## Vector Calculus
The gradient of a scalar field \$\\phi\$ is:
\$ \\nabla \\phi = \\left( \\frac{\\partial \\phi}{\\partial x}, \\frac{\\partial \\phi}{\\partial y}, \\frac{\\partial \\phi}{\\partial z} \\right) \$

The divergence of a vector field \$\\mathbf{F} = (F_x, F_y, F_z)\$ is:
\$ \\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z} \$

The curl of a vector field \$\\mathbf{F} = (F_x, F_y, F_z)\$ is:
\$ \\nabla \\times \\mathbf{F} = \\left( \\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z}, \\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x}, \\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y} \\right) \$
`
export default katexMarkdownText