import React from "react";
import ReactTags from "react-tag-autocomplete";
import "./styles.css";

const TagAutocomplete = ({ input: { value, onChange } }) => {
    const suggestions = [
        { id: 1, name: "Oracle Certified Associate Java Programmer (OCAJP)" },
        { id: 2, name: "Oracle Certified Professional Java Programmer (OCPJP)" },            
        { id: 3, name: "Spring Professional Certification" },
        { id: 4, name: "Oracle Certified Expert - Web Component Developer(OCEWCD)" },
        { id: 5, name: "Apache Spark Developer Certification (HDPCD)" },
        { id: 6, name: "Professional Scrum Master Certification(PSM I)" },
        { id: 7, name: "Professional Scrum Master Certification(PSM 2)" },
        { id: 8, name: "Project Management Professional Certification(PMP)" },
        { id: 9, name: "Agile Certified Professsional(ACP)" },
        { id: 10, name: "Certified Scrum Master(CSM)" },
        { id: 11, name: "AWS Certified Solutions Architect - Associate" },
        { id: 12, name: "Oracle Certified Master Java Enterprise Architect(OCMJEA)" }
    ];
    const newValue = !value ? [] : value;

    const handleDelete = i => {
        const items = [...newValue];
        items.splice(i, 1);
        onChange(items);
    };

    const handleAdd = e => {
        onChange([...newValue, e]);
    };

    return (
        <ReactTags
            placeholder="Add New"
            tags={newValue}
            suggestions={suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAdd}
        />
    );
};

export default TagAutocomplete;

// export default class TagAutocomplete extends React.Component {
//     constructor(props) {
//         super(props); console.log('props: ', props);

//         this.state = {
//             tags: [],
//             suggestions: [
//                 { id: 1, name: "Oracle Certified Associate Java Programmer (OCAJP)" },
//                 { id: 2, name: "Oracle Certified Professional Java Programmer (OCPJP)" },            
//                 { id: 3, name: "Spring Professional Certification" },
//                 { id: 4, name: "Oracle Certified Expert - Web Component Developer(OCEWCD)" },
//                 { id: 5, name: "Apache Spark Developer Certification (HDPCD)" },
//                 { id: 6, name: "Professional Scrum Master Certification(PSM I)" },
//                 { id: 7, name: "Professional Scrum Master Certification(PSM 2)" },
//                 { id: 8, name: "Project Management Professional Certification(PMP)" },
//                 { id: 9, name: "Agile Certified Professsional(ACP)" },
//                 { id: 10, name: "Certified Scrum Master(CSM)" },
//                 { id: 11, name: "AWS Certified Solutions Architect - Associate" },
//                 { id: 12, name: "Oracle Certified Master Java Enterprise Architect(OCMJEA)" }
//             ]
//         }
//     }

//     handleDelete(i) {
//         const tags = this.state.tags.slice(0)
//         tags.splice(i, 1)
//         this.setState({ tags })
//     }

//     handleAddition(tag) {
//         const tags = [].concat(this.state.tags, tag)
//         this.setState({ tags })
//     }

//     render() {
//         const { data } = this.props; console.log('data: ', data);

//         return (
//             <ReactTags
//                 tags={this.state.tags}
//                 suggestions={this.state.suggestions}
//                 handleDelete={this.handleDelete.bind(this)}
//                 handleAddition={this.handleAddition.bind(this)} />
//         )
//     }
// }
