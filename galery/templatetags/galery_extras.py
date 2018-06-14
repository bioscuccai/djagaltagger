from django import template
import os
import djagal.settings

register = template.Library()


@register.filter('chunks')
def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]


@register.inclusion_tag('galery/tags/artist_link.html')
def artist_name(image, artists):
    for artist in artists:
        image_file_name = os.path.basename(image.image.name)
        if image_file_name.startswith(artist.prefix):
            return {'artist': artist}

    return None

@register.filter('array_to_newline')
def array_to_newline(arr):
    return '\n'.join(arr)

@register.filter('present_image_ranges')
def present_image_ranges(page_num, image_ranges):
    page_num0 = page_num - 1
    
    return []

@register.filter('return_item')
def return_item(obj, key):
    return obj.get(key)
