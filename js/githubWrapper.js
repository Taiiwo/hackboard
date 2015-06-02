function GithubWrapper(){
  this.baseUrl = "https://api.github.com/";
  this.searchRepo = function(term, callback){
    var c = "search/repositories";
    var q = {
      q: term
    }
    this._query(c, q, callback);
  }
  this._query = function(c, q, callback){
    $.getJSON(
      this.baseUrl + c,
      q,
      function(data){
        callback(data);
      }
    );
  }
}
window.githubApi = new GithubWrapper;
