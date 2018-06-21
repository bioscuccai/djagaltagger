# Image tagging galery
A WIP Django Rest Framework + React project I'm learning DRF and MobX with. The code, especially the server's is a mess at the moment.

Also, it turns out that Djagal is a name in some countries, which was unintended on my part as I was just trying to find a throwaway name for a *Dja*ngo *gal*ery.

## Server
The server is using DRF to provide and API and still contains parts of an old MVC implementation that will be removed soon.

## Client
The client is done using React + MobX. It has been created with `create-react-app` and hasn't been ejected and I don't plan on doing so.

## Features
* allows uploading images in batch
* tag images and ranges
* categorize images by tags manually or by file name patterns
* check local and remote directory listings to check that all files are present

## TODO
* find an elegant way to deploy it
* proper authentication
* tests for both the front and backend
* MobX strict mode
