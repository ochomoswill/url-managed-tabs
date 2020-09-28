import React, {useEffect} from 'react';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import {useHistory, useParams} from "react-router-dom"

function App() {
    const DEFAULT_ACTIVE_TAB = "in_progress";
    const tabs = {
        "draft": {
            title: "Draft",
            content: (
                <Row className="p-2">
                    <Col sm="12" className="p-2">
                        <h4 className="text-info">Draft Tasks</h4>
                    </Col>
                </Row>
            )
        },
        "in_progress": {
            title: "In Progress",
            content: (
                <Row className="p-2">
                    <Col sm="12" className="p-2">
                        <h4 className="text-primary">In Progress Tasks</h4>
                    </Col>
                </Row>
            )
        },
        "completed": {
            title: "Completed",
            content: (
                <Row className="p-2">
                    <Col sm="12" className="p-2">
                        <h4 className="text-success">Completed Tasks</h4>
                    </Col>
                </Row>
            )
        }
    }

    const {active_tab} = useParams();
    const history = useHistory();

    const toggle = tab => {
        if (active_tab !== tab) {
            history.push(`/${tab}`);
        }
    }

    useEffect(() => {
        if (!active_tab) {
            history.push(`/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

    return (
        <div className="row p-4">
            <div className="col-lg-12">
                <h2 className="mb-4">Tasks</h2>

                <Nav tabs>
                    {
                        Object.entries(tabs).map((tab) => (
                            <NavItem key={tab[0]}>
                                <NavLink
                                    className={active_tab === tab[0] ? "active" : ""}
                                    onClick={() => {
                                        toggle(tab[0]);
                                    }}
                                    role="button"
                                >
                                    {tab[1].title}
                                </NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>

                <TabContent activeTab={active_tab}>
                    {
                        Object.entries(tabs).map((tab) => (
                            <TabPane key={tab[0]} tabId={tab[0]}>
                                {tab[1].content}
                            </TabPane>
                        ))
                    }
                </TabContent>
            </div>
        </div>
    );
}

export default App;
