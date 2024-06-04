# GTFS Schedule importer

![image](https://mobilitydatadev.com/images/gtfs-schedule-database.png)

This repository shows how to build a NodeJS app that ingests GTFS data into a PostgreSQL database, in three main steps:

1. download a GTFS ZIP file from the web
2. unzip it to reveal a list of TXT files
3. save each row of each file into the database.

To test it for yourself, either fork this repository or build your own copy by following the tutorial at https://mobilitydatadev.com/article/download-and-store-gtfs-schedule-data.
