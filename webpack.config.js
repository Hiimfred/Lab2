import HtmlWebPackPlugin from "html-webpack-plugin";
 
const htmlPlugin = new HtmlWebPackPlugin({ 
  template: "./src/index.html", 
  filename: "./index.html" 
}); 
 
export default { 
  module: { 
    rules: [ 
      { 
        test: /\.js$/, 
        exclude: /(node_modules| bower_components)/, 
        use: { 
          loader: "babel-loader", 
        } 
      } 
    ] 
  }, 
  plugins: [htmlPlugin] 
};