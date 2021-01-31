everytime they open app, go to home, home makes request that checks if they signed for last month.

every time user logins in, check all months that they have data in. then check that they have signed attest for each

pushed to test, it failed.

now trying locally. can't get to settings page, can only get to index page with url. can get to others but only by clikcing buttons.

restarted wed jan 20 514pm

<!-- for existing users, map id to rep. every one knew will have id string used as rep going forward -->

cognito auth.
then with that id, call get login. check for req.session, if not, set it.
