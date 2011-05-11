# Hidden Flash, Couching Firefox

This is (somewhat) reduced testcase for a Firefox4/Win bug, where Flash is sometimes invisible until a mouseover event fires

In order to make it easy to reproduce, the content of this repository is being served up at <http://roderick.dk/experiments/hidden-flash-crouching-firefox/>

## Steps to reproduce

1. Load the webpage in one of the following **Windows** versions of Firefox: 4.0, 4.0.1, Nightly 2011-05-10
2. Observe every 10 seconds the a different 'tab' will be displayed
3. Observe that sometimes, the Flash content will not be displayed
4. If Flash is not displayed, move the mouse over anything that can generate a mouseover event, even the browser chrome will work. Observe that the Flash now becomes visible.
	