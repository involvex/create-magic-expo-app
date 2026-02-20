#  (2026-02-20)


### Features

* **app:** enhance showcase template with settings and OAuth sample ([bde9423](https://github.com/involvex/create-magic-expo-app/commit/bde94236f932e7972bed441fd7335898ba41a677))


### BREAKING CHANGES

* **app:** OAuth providers changed from Google/Apple to GitHub/Discord
in the showcase template. The AuthContext signIn method now only accepts
"github" or "discord". Update any custom auth flows accordingly.



