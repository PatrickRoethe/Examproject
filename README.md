Exam project Noroff from Patrick 
# Project Exam - Blog

This is my exam project about creating a blog with all its contents. [Preview on Netlify](https://netlifyadjustments--examproject007.netlify.app/)

## Contents
- [Functions and Info for the Project](#functions-and-info-for-the-project)
- [Tutorial](#tutorial)
- [API and Endpoints](#api-and-endpoints)

## Functions and Info for the Project
- **Login**: Only authenticated users should be able to log in.
- **Create Post**: Users can create posts with pictures and titles.
- **Use API**: Utilizes an API for handling blog posts.
- **Detect LOgged in user**: Detects if user is logged in or not - hides/shows admin functions in navbar depending on logged in status ( api key).

### Authenticated User for Project
- **Mail**: patroe01271@stud.noroff.no
- **Pass**: Patrick123


## Tutorial
1. **How to Create a User**:
   - Go to the register page or via login and register.
   - Mail must contain "@stud.noroff.no".
   - Password must be 8 characters.

2. **How to Login**:
   - Go to the login page and enter your credentials.
   - Use mail with "@stud.noroff.no" and the registered username.

3. **How to Create a Post**:
   - Must be authenticated.
   - Go to the edit page and fill in the required fields.
   - Submit the post.

4. **How to Edit Posts**:
   - Must be authenticated.
   - Copy the post ID and add it to the ID field.
   - Load, edit, and save or delete the post.

## API and Endpoints
- Main API: [Noroff API](https://v2.api.noroff.dev/)
  - `GET /blog/posts/`
  - `GET /blog/posts/{id}`
  - `POST /blog/posts/`
  - `PUT /blog/posts/{id}`
  - `DELETE /blog/posts/{id}`
  - `POST /auth/register`
  - `POST /auth/login`

## Summary
Creating a functional webpage that can be used as a blog platform for a company or private use. It contains all necessary functions for login, user creation, post creation, editing, and deletion.

**Still UNDER CONSTRUCTION!**

Thank you for visiting!


Info to teacher:


Username: patroe01271@stud.noroff.no
Pw: Patrick123

Netlify links:

https://netlifyadjustments--examproject007.netlify.app/ - homepage


https://netlifyadjustments--examproject007.netlify.app/html/account/login.html - Login


https://netlifyadjustments--examproject007.netlify.app/html/account/register.html - Register


https://netlifyadjustments--examproject007.netlify.app/html/post/make - Make/create post


https://netlifyadjustments--examproject007.netlify.app/html/post/edit.html - Edit

Other links:

Figma file ( low fidelity) : https://www.figma.com/design/1fZLYh5f3mSCejsjYD0yh3/examproject1lowfidelity?t=x1HrKmlv9wr7QV5c-1

Netlify Deploy:
https://app.netlify.com/sites/examproject007/deploys/665cf35f8484c0bb29e451db
