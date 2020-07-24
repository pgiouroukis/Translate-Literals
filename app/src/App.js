import React, { useEffect, useState } from "react";
import "./App.css";

//general imports
import PrimarySearchAppBar from "./components/Navbar";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import languages from "./media/languages.json"

//custom components
import RowCard from "./components/RowCard";
import Footer from "./components/Footer";

function App() {

    var [records, setRecords] = useState([])
    var [languageCode, setLanguageCode] = useState("");

    useEffect(() => {

        if (sessionStorage.getItem("languageId") === null) {
            sessionStorage.setItem("languageId", "0");
            sessionStorage.setItem("languageCode", "en");
        }

        for (var language of languages) {
            if (language.id === sessionStorage.getItem("languageId")) {
                setLanguageCode(language.code);
                sessionStorage.setItem("languageCode", language.code);
                break;
            }

        }

        fetch("http://pgiouroukis.semantic.gr:9000/list/25")
		.then((response) => response.json())
		.then((data) => {
            setRecords(data)
        });        
    } , [] )

	return (
		<div className="App">
			<PrimarySearchAppBar />
			<div>
				{records.map((record) => {
					return (
						<RowCard
							key={record.code}
							str={record.str}
							code={record.code}
							translateButton={false}
							saveButton={true}
							val={record[languageCode]}
						/>
					);
				})}
			</div>
			<Footer>
				<Grid container spacing={3}>
					<Grid item container xs={6} sm={6} justify="flex-start">
						<Fab color="primary" style={{ pointerEvents: "auto" }} aria-label="add">
							<ChevronLeftIcon fontSize="large" />
						</Fab>
					</Grid>
					<Grid item container xs={6} sm={6} justify="flex-end">
						<Fab color="primary" style={{ pointerEvents: "auto" }} aria-label="add">
                            <ChevronRightIcon fontSize="large"/>
						</Fab>
					</Grid>
				</Grid>
			</Footer>
		</div>
	);
}


export default App;
