#!/usr/bin/env python
import cgi
import cgitb
print "Content-Type: text/html\n"
cgitb.enable()
form = cgi.FieldStorage()
#print form["id"].value
# check get variables
if eventId in form and userId in form:# if user and event is defined
  # generate key

  # add key-id pair to a database with timestamp
  # send email to event owner with url with get parameter 'key'
  # if key is defined
    # check for keypair in the database
      # also check for old keys
      # if key matches
        # add the id as the owner of the event
        # show authentication complete screen
