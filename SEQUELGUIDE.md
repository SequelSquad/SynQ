# SequelSquad #

### Models ###
A model represents a table in the database. Instances of this class represent a database row.

Model instances operate with the concept of a dataValues property, which stores the actual values represented by the instance. By default, the values from dataValues can also be accessed directly from the instance.

# Values #
- key & value pair
- Sequel Data Types

# Data Types #
- STRING: A Variable length string.
- CHAR: A fixed length string.
- TEXT: An unlimited length text column. Availble legnths: tiny, medium, long.
- INTEGER: A 32 bit integer.
- FLOAT: FLoating point number (4-byte precision).
- DOUBLE: FLoating point number (8-byte precision).
- DECIMAL: Decimal number.
- REAL: Floating point number (4-byte precision).
- BOOLEAN: A boolean / tinyint column, depending on dialect.
- BLOB: Binary storage. Available legnths: tiny, medium, long.
- ENUM: An enumeration. DataTypes.ENUM('value', 'another value').
- DATE: A datetime column.
- DATEONLY: A date only column (no timestamp).
- TIME: A time column.
- NOW: A default value of the current timestamp.
- JSON: A JSON string column. Only available in postgres and sqlite.
- ARRAY: An array of a specific TYPE, e.g. DataTypes.ARRAY(DataTypes.Decimal). Only available in postgres.
- Range: Range types are data types representing a range of values of some element type (called the range's subtype). Only available in postgres. See the Postgres documentation for more details.
- Virtual: A virtual value that is not stored in the DB. This could for example be useful if you want to provide a default value in your model that is returned to the user but not stored in the DB. You could also use it to validate a value before permuting and storing it. Checking password length before hashing it.


# Getters & Setters #
It is possible to define 'object-property' getter and setter functions on your models, these can be used both for 'protecting' properties that map to database fields and for defining 'pseudo' properties.

Getters and Setters can be defined in 2 ways ( you can mix and match these 2 approaches):
- as part of a single property definition
- as part of a model options

# Validations #
Model validations allow you to specify format/content/inheritance validations for each attribute of the model.

Validations are automatically run on create, update, and save. You can also call validate() to manually validate an instance.

- is: ["%[a-z]+$",'i']
- is: /"%[a-z]+$"/i
- not: ["^[a-z]+$",'i']
- isEmail: true
- isUrl: true
- isIP: true
- isIPv4: true
- isIPv6: true
- isAlpha: true
- isAlphanumeric: true
- isNumeric: true
- isInt: true
- isFloat: true
- isDecimal: true
- isLowercase: true
- isUppercase: true
- notNull: true
- isNull: true
- notEmpty: true
- equals: 'specific value'
- contains: 'foo'
- notIn: [['foo', 'bar']]
