// USER [START]
export type UserProfile = {
    id: number;
    name?: string;
    nik?: string;
    phone?: string;
    employee_no?: string;

    // Foreign keys
    user_division_id?: number;
    user_position_id?: number;

    // Foreign keys data
    user_division?: string;
    user_position?: string;
}

export type User = UserProfile & {
    email: string;
    password: string;

    // Foreign key
    roles_id?: number;

    // Foreign key data
    role?: string;
}
// USER [END]

// PROJECT [START]
export type Project = {
    id: number;
    code: string;
    name: string;
    customer: string;
    contract_number: string;
    contract_start: string;
    contract_end: string;
    duration: string;
    days_left: number;

    // Foreign keys
    business_type_id?: number;
    user_id?: number;

    // Foreign keys data
    type?: string;
    person_in_charge?: string;

    // Additional data
    project_documents?: ProjectDocument[];
}

export type ProjectDocument = {
    id: number,
    name: string,
    priority: string,
    monthly_deadline: string,

    project_id: string,

    // Additional data
    project_document_versions?: ProjectDocumentVersions[];
}

export type ProjectDocumentVersions = {
    id: number;
    version: string;
    document_number: string;
    release_date: Date;
    file_name: string;

    project_document_id: string;
}
// PROJECT [END]

// MASTER [START]
export type BaseMasterData = {
    id: number;
    name: string;
    description?: string | undefined;
};

export type UserRole = BaseMasterData;

export type UserDivision = BaseMasterData;

export type UserPosition = BaseMasterData & {
    division: string;
};

export type ProjectBusinessType = BaseMasterData;
// MASTER [END]
