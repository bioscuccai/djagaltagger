from django import forms

class UploadForm(forms.Form):
  images = forms.ImageField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
