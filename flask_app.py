# Import the dependencies.
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///SQLiteDatabase/Accidents_2021.db"+'?check_same_thread=False')

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

accident = Base.classes.accidents
population = Base.classes.population

################################################
# Flask Setup 
################################################
app = Flask(__name__) 

#################################################
# Flask Routes
#################################################

# Main route listing all API routes
@app.route("/")
def welcome():
    """List all aviailable API Routes."""
    return(
        f"<h3>Available Routes:</h3>"
        f"/api/v1.0/lighting_conditions<br>"
        f"/api/v1.0/weather_conditions<br>"
        f"/api/v1.0/accident_type<br>"
        )


# Route for lighting conditions
@app.route("/api/v1.0/lighting_conditions")
def lighting():
    session = Session(engine)

    # Query returning date and precipitation date from measurement table
    # Filtered for date occuring on and after query date  
    lighting_results = session.query(accident.STATENAME, accident.LATITUDE, accident.LONGITUD, accident.LGT_CONDNAME).all()
        
    # Close session
    session.close

    # Open empty precipitation list to record output
    lighting = []

    # For loop through the query results
    for STATENAME, LATITUDE, LONGITUD, LGT_CONDNAME in lighting_results:
        # Open empty dicitionary
        light_dict = {}

        # Write output into dictionary
        light_dict["state"] = STATENAME
        light_dict["lat"] = LATITUDE
        light_dict["lon"] = LONGITUD
        light_dict["lighting_condition"] = LGT_CONDNAME

        # Append dictionary to precipitation list
        lighting.append(light_dict)
    
    # Jsonify the output
    return jsonify(lighting)
    

@app.route("/api/v1.0/weather_conditions")
def weather():
    session = Session(engine)

    # Query returning date and precipitation date from measurement table
    # Filtered for date occuring on and after query date  
    weather_results = session.query(accident.STATENAME, accident.LATITUDE, accident.LONGITUD, accident.WEATHERNAME).all()
        
    # Close session
    session.close

    # Open empty precipitation list to record output
    weather = []

    # For loop through the query results
    for STATENAME, LATITUDE, LONGITUD, WEATHERNAME in weather_results:
        # Open empty dicitionary
        weather_dict = {}

        # Write output into dictionary
        weather_dict["state"] = STATENAME
        weather_dict["lat"] = LATITUDE
        weather_dict["lon"] = LONGITUD
        weather_dict["weather_condition"] = WEATHERNAME

        # Append dictionary to precipitation list
        weather.append(weather_dict)
    
    # Jsonify the output
    return jsonify(weather)


@app.route("/api/v1.0/accident_type")
def accident_call():
    session = Session(engine)

    # Query returning date and precipitation date from measurement table
    # Filtered for date occuring on and after query date  
    accident_results = session.query(accident.STATENAME, accident.LATITUDE, accident.LONGITUD, accident.HARM_EVNAME, population.POPESTIMATE2021, accident.STATE, population.STATE).\
        filter(accident.STATE == population.STATE).all()
        
    # Close session
    session.close

    # Open empty precipitation list to record output
    accident_list = []

    # For loop through the query results
    for STATENAME, LATITUDE, LONGITUD, HARM_EVNAME, POPESTIMATE2021, accident.STATE, population.STATE in accident_results:
        # Open empty dicitionary
        accident_dict = {}

        # Write output into dictionary
        accident_dict["state"] = STATENAME
        accident_dict["lat"] = LATITUDE
        accident_dict["lon"] = LONGITUD
        accident_dict["accident_type"] = HARM_EVNAME
        accident_dict["population"] = POPESTIMATE2021

        # Append dictionary to precipitation list
        accident_list.append(accident_dict)
    
    # Jsonify the output
    return jsonify(accident_list)


if __name__ == '__main__':
    app.run(debug=True)
