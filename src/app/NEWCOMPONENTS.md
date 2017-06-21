# New components

If you nedd to create an component find if already exists an "context" to place the folder it. Then if doesn't create a new folder here. The folder name **has** to be the name of your component in kebab-case and must have these 3 files:
* `<component-name>.component.html` - HTML template
* `<component-name>.component.css` - stylesheet
* `<component-name>.component.ts` - Component itself
* `<component-name>.service.ts` - Occasionally you'll need do requests to an API in that cases create a `service` and import it into your component

Don't forget to put your new component in the "closest" module.
**Always** do test when you can!
