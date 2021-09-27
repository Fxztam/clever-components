import { serveContent } from '../cdn-server/server-utils.js';

const PATH_REGEX = /^\/custom-config-([a-z0-9-]*)\/multiple\.html$/;

export function applyTemplate (context) {
  if (!context.requestUrl.pathname.match(PATH_REGEX)) {
    return;
  }
  const content = renderContent(context);
  return serveContent(context, content, 'text/html');
}

function renderContent (context) {

  const configId = PATH_REGEX.exec(context.requestUrl.pathname)[1];

  return `
  
  <!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Simple page</title>
  <link rel="stylesheet" href="../global-styles.css">
  <link rel="stylesheet" href="../multiple.css">
  <script type="module" src="./multiple.js" defer></script>
</head>
<body>

<header>
  <h1>Clever components benchmark / multiple (custom config / ${configId})</h1>
  <span>
    <a href="./simple.html">simple</a>
    <a href="./multiple.html#one">multiple (one)</a>
    <a href="./multiple.html#two">multiple (two)</a>
    <a href="./multiple.html#three">multiple (three)</a>
  </span>
</header>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris sem, ultricies a pharetra eget, interdum in ex. In accumsan mi vitae velit pulvinar tempus. Cras tempor porta nisi nec dignissim. Donec quis dolor congue neque tincidunt euismod. Morbi eu efficitur nisl, sit amet aliquam urna. Phasellus ac ante vel felis volutpat lacinia. Aenean lobortis dictum mi, ac placerat metus sollicitudin et. Integer blandit consectetur lorem. Vivamus rhoncus dapibus rhoncus. Morbi ornare finibus lorem, eu sollicitudin nunc fermentum sed. Maecenas sit amet porttitor orci. Nunc nec condimentum eros. Pellentesque fringilla, ligula ut laoreet vestibulum, nulla risus volutpat elit, eu egestas mi nulla non dolor. Nullam iaculis magna sapien, hendrerit iaculis quam laoreet quis. Mauris eleifend euismod felis at accumsan.</p>

<div id="main"></div>

<p>Nunc ac sem ligula. Mauris nec est ac libero aliquam aliquet sed hendrerit risus. Donec a erat ut augue ultrices porta id vel est. Ut rutrum lorem quis fermentum maximus. Vestibulum elit velit, dapibus in erat nec, mattis suscipit justo. Aliquam ultricies efficitur elit, vitae tempus tellus auctor quis. Praesent vulputate tellus sed dictum vehicula. Suspendisse bibendum tempor sem, ut auctor elit. Cras commodo enim ut metus imperdiet, eget ullamcorper lacus porta. Curabitur egestas placerat quam in faucibus. Pellentesque vitae nisi nisi. Vestibulum efficitur rhoncus lectus, vitae fringilla enim blandit ut. Maecenas mollis at purus in blandit.</p>

</body>
</html>
  
  `.trim();
}
