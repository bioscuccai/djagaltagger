from django import template

register = template.Library()

def chunks(l, n):
  for i in range(0, len(l), n):
    yield l[i:i + n]

register.filter('chunks', chunks)
