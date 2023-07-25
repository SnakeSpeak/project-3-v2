CREATE TABLE accidents (
    STATE INT NOT NULL,
    STATENAME VARCHAR NOT NULL,
    ST_CASE INT PRIMARY KEY,
    PEDS INT   NOT NULL,
    PERNOTMVIT INT   NOT NULL,
    VE_TOTAL INT   NOT NULL,
    VE_FORMS INT   NOT NULL,
    PVH_INVL INt   NOT NULL,
    PERSONS INT   NOT NULL,
    PERMVIT INT   NOT NULL,
    COUNTY INT   NOT NULL,
    COUNTYNAME VARCHAR   NOT NULL,
    CITY INT   NOT NULL,
    CITYNAME VARCHAR   NOT NULL,
    MONTH VARCHAR   NOT NULL,
    MONTHNAME VARCHAR   NOT NULL,
    DAY VARCHAR   NOT NULL,
    DAYNAME VARCHAR   NOT NULL,
    DAY_WEEK VARCHAR   NOT NULL,
    DAY_WEEKNAME VARCHAR   NOT NULL,
    YEAR VARCHAR   NOT NULL,
    HOUR VARCHAR   NOT NULL,
    HOURNAME VARCHAR   NOT NULL,
    MINUTE VARCHAR   NOT NULL,
    MINUTENAME VARCHAR   NOT NULL,
    TWAY_ID VARCHAR,
    TWAY_ID2 VARCHAR,
    ROUTE VARCHAR   NOT NULL,
    ROUTENAME VARCHAR   NOT NULL,
    RUR_URB VARCHAR   NOT NULL,
    RUR_URBNAME VARCHAR   NOT NULL,
    FUNC_SYS VARCHAR   NOT NULL,
    FUNC_SYSNAME VARCHAR   NOT NULL,
    RD_OWNER VARCHAR   NOT NULL,
    RD_OWNERNAME VARCHAR   NOT NULL,
    NHS VARCHAR   NOT NULL,
    NHSNAME VARCHAR   NOT NULL,
    SP_JUR VARCHAR   NOT NULL,
    SP_JURNAME VARCHAR   NOT NULL,
    MILEPT INT   NOT NULL,
    MILEPTNAME VARCHAR   NOT NULL,
    LATITUDE FLOAT   NOT NULL,
    LATITUDENAME VARCHAR   NOT NULL,
    LONGITUD FLOAT   NOT NULL,
    LONGITUDNAME VARCHAR   NOT NULL,
    HARM_EV VARCHAR   NOT NULL,
    HARM_EVNAME VARCHAR   NOT NULL,
    MAN_COLL VARCHAR   NOT NULL,
    MAN_COLLNAME VARCHAR   NOT NULL,
    RELJCT1 VARCHAR   NOT NULL,
    RELJCT1NAME VARCHAR   NOT NULL,
    RELJCT2 VARCHAR   NOT NULL,
    RELJCT2NAME VARCHAR   NOT NULL,
    TYP_INT VARCHAR   NOT NULL,
    TYP_INTNAME VARCHAR   NOT NULL,
    REL_ROAD VARCHAR   NOT NULL,
    REL_ROADNAME VARCHAR   NOT NULL,
    WRK_ZONE VARCHAR   NOT NULL,
    WRK_ZONENAME VARCHAR   NOT NULL,
    LGT_COND VARCHAR   NOT NULL,
    LGT_CONDNAME VARCHAR   NOT NULL,
    WEATHER VARCHAR   NOT NULL,
    WEATHERNAME VARCHAR   NOT NULL,
    SCH_BUS VARCHAR   NOT NULL,
    SCH_BUSNAME VARCHAR   NOT NULL,
    RAIL VARCHAR   NOT NULL,
    RAILNAME VARCHAR   NOT NULL,
    NOT_HOUR VARCHAR   NOT NULL,
    NOT_HOURNAME VARCHAR   NOT NULL,
    NOT_MIN VARCHAR   NOT NULL,
    NOT_MINNAME VARCHAR   NOT NULL,
    ARR_HOUR VARCHAR   NOT NULL,
    ARR_HOURNAME VARCHAR   NOT NULL,
    ARR_MIN VARCHAR   NOT NULL,
    ARR_MINNAME VARCHAR   NOT NULL,
    HOSP_HR VARCHAR   NOT NULL,
    HOSP_HRNAME VARCHAR   NOT NULL,
    HOSP_MN VARCHAR   NOT NULL,
    HOSP_MNNAME VARCHAR   NOT NULL,
    FATALS INT   NOT NULL
);



CREATE TABLE population (
    SUMLEV VARCHAR   NOT NULL,
    REGION VARCHAR   NOT NULL,
    DIVISION VARCHAR   NOT NULL,
    STATE VARCHAR   NOT NULL,
    NAME VARCHAR   PRIMARY KEY,
    ESTIMATESBASE2020 INT   NOT NULL,
    POPESTIMATE2020 INT   NOT NULL,
    POPESTIMATE2021 INT   NOT NULL,
    NPOPCHG_2020 INT   NOT NULL,
    NPOPCHG_2021 INT   NOT NULL,
    BIRTHS2020 INT   NOT NULL,
    BIRTHS2021 INT   NOT NULL,
    DEATHS2020 INT   NOT NULL,
    DEATHS2021 INT   NOT NULL,
    NATURALINC2020 INT   NOT NULL,
    NATURALINC2021 INT   NOT NULL,
    INTERNATIONALMIG2020 INT   NOT NULL,
    INTERNATIONALMIG2021 INT   NOT NULL,
    DOMESTICMIG2020 INT   NOT NULL,
    DOMESTICMIG2021 INT   NOT NULL,
    NETMIG2020 INT   NOT NULL,
    NETMIG2021 INT   NOT NULL,
    RESIDUAL2020 INT   NOT NULL,
    RESIDUAL2021 INT   NOT NULL,
    RBIRTH2021 FLOAT   NOT NULL,
    RDEATH2021 FLOAT   NOT NULL,
    RNATURALINC2021 FLOAT   NOT NULL,
    RINTERNATIONALMIG2021 FLOAT   NOT NULL,
    RDOMESTICMIG2021 FLOAT   NOT NULL,
    RNETMIG2021 FLOAT   NOT NULL
);