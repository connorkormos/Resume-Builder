import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Field from "./Field";

export default function OverFlowResumePaper() {
    const fieldsById = useSelector((state) => state.resume.present.fields.byId);
    const subsectionsById = useSelector((state) => state.resume.present.subsections.byId);
    const sectionsById = useSelector((state) => state.resume.present.sections.byId);
    const [sectionsToRender, setSectionsToRender] = useState([]);
    const [subsectionsToRender, setSubsectionsToRender] = useState([]);
    const [fieldsToRender, setFieldsToRender] = useState([]);

    useEffect(() => {
        if (!fieldsById) return;
        const fieldsOnPageTwo = Object.values(fieldsById).filter(field => field.pageNumber === 2);
        for (const field of fieldsOnPageTwo) {
            const subsection = subsectionsById[field.subsectionId];
            const section = sectionsById[subsection.sectionId];
            if (section.subsectionIds.length === 1 && !sectionsToRender.includes(section.id)) {
                setSectionsToRender(prev => [...prev, section.id]);
            } else if (!subsectionsToRender.includes(subsection.id)) {
                setSubsectionsToRender(prev => [...prev, subsection.id]);
            }
        }
        // setFieldsToRender(fieldsOnPageTwo);
        console.log('Fields on page two:', fieldsOnPageTwo);
        // console.log('Fields to render:', fieldsToRender);
        return () => {
            setFieldsToRender([]);
            setSectionsToRender([]);
            setSubsectionsToRender([]);
        };
    }, [fieldsById]);


    return (
        <div style={{ height: 'var(--height-editor-page)', width: 'var(--width-editor-page)', marginTop: '5rem', backgroundColor: 'white' }}>
            Overflow Resume Paper Content
            
            {/* {fieldsToRender.map(field => (
                // <p>{field.id}</p>
                <Field
                    key={field.id}
                    index={fieldsToRender.indexOf(field)}
                    fieldId={field.id}
                    layout={null}
                    parentLayoutDict={null}
                />
            ))} */}
        </div>
    );
}