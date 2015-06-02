function GithubWrapper(){
  this.baseUrl = "https://api.github.com/";
  this._searchHistory = [];
  var self = this;
  this.searchRepo = function(term, callback){
    var c = "search/repositories";
    var q = {
      q: term
    }
    if (this._notRedundant(c, q, callback)){
      this._query(c, q, callback);
    }
  }
  this._query = function(c, q, callback){
    $.getJSON(
      this.baseUrl + c,
      q,
      function(data){
        callback(data);
        self._searchHistory.push([c, q, data])
      }
    );
  }
  this._notRedundant = function(c, q, callback){
    for (var i in this._searchHistory){
      var search = this._searchHistory[i];
      if (search[0] == c && JSON.stringify(search[1]) == JSON.stringify(q)){
        callback(search[2]);
        return false;
      }
    }
    return true;
  }
}
window.githubApi = new GithubWrapper;
