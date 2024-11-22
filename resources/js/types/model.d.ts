type BaseModel = {
    id: number;
    created_at: Date;
    updated_at: Date;
}

type BaseMasterData = BaseModel & {
    name: string;
    description?: string | undefined;
};

// USER [START]
export type UserProfile = BaseModel & {
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
export type Project = BaseModel & {
    code: string;
    name: string;
    customer: string;
    contract_number: string;
    contract_start: Date;
    contract_end: Date;

    duration?: string;
    days_left?: number;

    // Foreign keys
    project_business_type_id?: number;
    user_profile_id?: number;

    // Foreign keys data
    type?: string;
    person_in_charge?: string;

    // Additional data
    project_documents?: ProjectDocument[];
}

export type ProjectDocument = BaseModel & {
    name: string,
    priority: number,
    priority_name?: string,
    base_deadline: number,
    deadline: Date,
    deadline_interval: number,

    project_id: string,
    project?: string,

    // Additional data
    project_document_versions?: ProjectDocumentVersion[];
}

export type ProjectDocumentVersion = BaseModel & {
    version: string;
    document_number: string;
    release_date: Date;
    file_name: string;

    project_document_version_updates?: ProjectDocumentVersionUpdate[];

    project_document_id: string;

    latest_document: string;
}

export type ProjectDocumentVersionUpdate = BaseModel & {
    title: string;
    description: string;
    document_link: string;
    status: number;

    project_document_version_id: number;
}
// PROJECT [END]

// MASTER [START]
export type UserRole = BaseMasterData;

export type UserDivision = BaseMasterData;

export type UserPosition = BaseMasterData & {
    user_division_id?: number;
    division?: string;
};

export type ProjectBusinessType = BaseMasterData;
// MASTER [END]
