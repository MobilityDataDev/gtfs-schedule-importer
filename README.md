# GTFS Schedule importer

This repository shows how to build a NodeJS app that ingests GTFS data into a PostgreSQL database, in three main steps:

1. downloading a GTFS ZIP file from the web
2. unzipping it to reveal a list of TXT files
3. saving each row of each file into the database.

The database looks like this in the project's pgAdmin interface:

![Database with GTFS data](https://mobilitydatadev.com/images/gtfs-schedule-database.png)

To test it for yourself, either fork this repository or build your own copy by following the tutorial at https://mobilitydatadev.com/article/downloading-and-storing-gtfs-schedule-data.
