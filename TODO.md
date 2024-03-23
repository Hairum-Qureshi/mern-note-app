[] Find a way to have the registration form throw an error if the user just enters spaces in the input field.
    -> Try and use the trim() method! 
    
[] Fix it so that on the homepage, the greeting says something like "Have a good night!" from 8 PM to 6 AM.
    -> Then from 6 AM to 11 AM, it'll say "Good Morning!" 

[] Set up Google Authentication! 

[] In the notebook page that displays all the user's notebooks, add a hover affect to the trash and edit button icons 

[] Fix bug when user signs out (see server terminal) 
    -> *Possibly* resolved

[x] For the notebook page, add the ability to truncate the notebook names if they're too long 
    -> Ended up adding a character limit instead

[] Consider using React Query for caching the notebooks the user has (but it re-caches every time the user creates a new notebook to have the up-to-date notebooks). \
    -> Check out: [this question's solution](https://stackoverflow.com/questions/66261207/how-to-add-edit-button-and-function-in-react-js)

[] Add a 'create new notebook' button on the notebook page

[] Resolve issue where if you update the notebook name, it does show the new name, however, if you go from one page to another in the application, it'll show the previous name and not the one you just set; you have to refresh the page in order to "finalize" the new name because then it'll cause the variable "newName" to go undefined and use the name from the database.

[] Resolve the "delete notebook issue" on the page that displays all the user's notebooks. When the user deletes the notebook, it does disappear, but if they switch between routes and did not refresh on the notebook route, the notebook they deleted comes back and they have to refresh the page before leaving it.

[] Add middleware to prevent users from tampering with the URL, especially when it comes to the notebooks/the notebook note routes where they change the user id. If they do mess with the user id and it's not their user id, redirect them to a 404 page because only the creators of the notebooks are allowed to view the notes

[] Need to redirect user to 404 page if the user accesses a notebook that's deleted. Also need to make sure all notes created in that notebook are deleted too. To elaborate, if the user visits a URL of a deleted notebook, they should be redirected to a 404 page and not the notebook itself.