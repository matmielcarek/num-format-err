# num-format-err

React app that formats a given number to round to an appropriate count of significant digits based on the given uncertainty of the value.

The problem of rounding numbers based on a known error of the value is described in my [blog](https://mmielcarek.com/rounding_numbers/).

In short, any number written without its uncertainty actually contains information about the uncertainty. If you write: 1000.00, 1000 and 1.0E+3, the actual values are: 1000±0.005, 1000±0.5 and 1000±50. Conversely, if you know that your chicken weighs 2.444 kg because you weighed it with a scale and the scale was accurate to ±0.01 kg plus 1% of the weighed mass (in this case 0.02444 kg), you still cannot write 2.444±0.03444 kg - that makes no sense. It is possible to determine mathematically which digits of a given number are actually significant and should be reported. That is exactly what this code does. So the weight of the chicken shoud be written as follows: 2.44±0.03 kg

The app also allows the number to be displayed in the desired format, either in the standard notation: '2.44±0.03' and in the more concise 'parentheses' notation: '2.44(3)' [see Wikipedia](https://en.wikipedia.org/wiki/Uncertainty), in both decimal and scientific form: '(2.44±0.03)e+0' // '2.44(3)e+0'.

I have not found anything similar on the internet yet, especially when I needed such an algorithm during writing my PhD thesis. I also plan to create a very simple package for JS, Python and VBA that would do the same. Anyway, it involves simple arithmetic and some string manipulations, so someone who knows the problem can easily implement this solution in any environment. See my [blog](https://mmielcarek.com/rounding_numbers/) for details.

Cheers!
